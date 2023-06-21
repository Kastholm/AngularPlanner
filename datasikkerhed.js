// Indlæs alle de nødvendige moduler
// dotenv tillader at indlæse miljøvariable fra en .env fil
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// bcrypt bruges til at hashe adgangskoder
const bcrypt = require("bcrypt");
const router = express.Router();
// express-rate-limit bruges til at begrænse antallet af anmodninger pr. IP-adresse
const rateLimit = require("express-rate-limit");
// Joi bruges til at validere input
const Joi = require("joi");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const cookieSession = require("cookie-session");

// Definer skemaet for brugere, inkluderer email og password felter
/* Unique */
const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Definer modelen for brugere ved hjælp af mongoose
const User = mongoose.model("Users", userSchema);

// Indfør begrænsning på antallet af login-forsøg for at undgå brute-force angreb
/* IP LIMIT - Brute force attack */
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutter
  max: 100, // begræns hver IP til 100 forespørgsler per vindue
  message: "For mange login-forsøg fra denne IP, prøv venligst igen senere",
});

// Definer skema til validering af brugerinput, det sikrer at input er i det rigtige format
/* VALIDERING */
const userInputSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(30).required(),
});

// Passport.js middleware
router.use(passport.initialize());
router.use(passport.session());

// Cookie-session middleware
router.use(
  cookieSession({
    name: "session",
    keys: [process.env.SESSION_SECRET],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

// Passport.js Local Strategy
passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        // Find brugeren i databasen ved hjælp af email
        const userData = await User.findOne({ email: email });
        if (!userData) {
          // Hvis brugeren ikke findes, send en fejl
          return done(null, false, { message: "Bruger ikke fundet" });
        }

        // Sammenlign den indtastede adgangskode med den hashede adgangskode i databasen
        /* HASHING sammenligning med database */
        const passwordMatches = await bcrypt.compare(
          password,
          userData.password
        );
        if (!passwordMatches) {
          // Hvis adgangskoderne ikke matcher, send en fejl
          return done(null, false, { message: "Ugyldig adgangskode" });
        }

        return done(null, userData);
      } catch (err) {
        // Hvis der er en serverfejl, send en fejl
        return done(err);
      }
    }
  )
);

// Tell Passport.js how to serialize/deserialize the user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

router.post(
  "/login",
  loginLimiter,
  passport.authenticate("local"),
  (req, res) => {
    // Send bruger data tilbage til klienten
    res.json(req.user);
  }
);

router.post("/createUser", async (req, res) => {
  // Valider input først ved hjælp af Joi, det sikrer at input er i det rigtige format
  /* VALIDERING */
  const { error } = userInputSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    // Tag brugerdata fra request
    const userData = req.body;
    // Generer et salt ved hjælp af bcrypt, dette bruges til at hashe adgangskoden
    /* Salt hash-var;rdi */
    const salt = await bcrypt.genSalt(10);
    // Hash adgangskoden ved hjælp af det genererede salt
    /* HASH Kodeord */
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    // Opret en ny bruger med email og den hashede adgangskode
    const newUser = new User({
      email: userData.email,
      password: hashedPassword,
    });
    // Gem den nye bruger i databasen og returner den gemte bruger
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    // Hvis der er en serverfejl, send en fejl
    res.json({ message: err });
  }
});

// Eksporter routeren for at bruge den i andre filer
module.exports = router;
