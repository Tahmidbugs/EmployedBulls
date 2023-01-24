const router = require("express").Router();
const twilio = require("twilio");
const dotenv = require("dotenv");
const db = require("../db");

dotenv.config();
const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;
const verifySid = process.env.VERIFY_SID;
const client = twilio(accountSid, authToken);

router.post("/verify", (req, res) => {
  const { email, verificationCode } = req.body;

  client.verify
    .services(verifySid)
    .verificationChecks.create({ to: email, code: verificationCode })
    .then((verification_check) => {
      if (verification_check.status === "approved") {
        res.status(200).json({ message: "Verification approved" });
      } else {
        res.status(401).json({ message: "Invalid verification code" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Failed to verify the code" });
    });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const results = await db.query(
    "SELECT * FROM users WHERE email=$1 and password=$2",
    [email, password]
  );
  if (results.rows.length > 0) {
    // If a user was found, check the password
    const user = results.rows[0];
    // If the password is correct, check if the user is an admin
    if (user.admin) {
      // If the user is an admin, redirect to the admin page
      console.log("is admin");
      return res.status(200).json(user);
    } else {
      // If the user is not an admin, redirect to the home page
      console.log("isnt admin");
      return res.status(200).json(user);
    }
  } else {
    // If no user was found, return an error message
    console.log(email, password, "not found in database");

    console.log("incorrect password");
    return res.status(401).json({ error: "Incorrect username or password" });
  }
});

router.post("/register", async (req, res) => {
  const { email, username, password } = req.body;

  try {
    // Send verification code to the email address
    client.verify
      .services(verifySid)
      .verifications.create({ to: email, channel: "email" })
      .then((verification) => {
        // Store the email and a boolean value indicating whether the email has been verified in the database
        db.query(
          "INSERT INTO students (email,username,password) VALUES ($1, $2, $3)",
          [email, username, password]
        )
          .then((results) => {
            res
              .status(200)
              .json({ message: "Verification code sent to the email" });
          })
          .catch((err) => {
            console.error(err);
            res
              .status(500)
              .json({ message: "Failed to store the email in the database" });
          });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Failed to send verification code" });
      });
  } catch (error) {
    console.error(error);
    res.status(501).json("Couldnt register");
  }
});
module.exports = router;
