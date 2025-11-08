import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import Usuario from "../models/Usuario";

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "senha" },
    async (email, senha, done) => {
      try {
        const user = await Usuario.findOne({ email });
        if (!user)
          return done(null, false, { message: "Usuário não encontrado" });

        const isMatch = await bcrypt.compare(senha, user.senha);
        if (!isMatch) return done(null, false, { message: "Senha incorreta" });

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

export default passport;
