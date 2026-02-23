import { Response, Request } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';


//register new user and return token
export const register = async (req: Request , res: Response ): Promise<void> => {
    try {
        //destructure and type the request body
        const { name, email, password } = req.body as {   
            name: string;
            email: string; 
            password: string; 
        };

        //check if user already exists
        const existing = await User.findOne({email});
        if(existing) {res.status(400).json({message: 'Email already Registered'}); 
        return; 
     }

        //hash password never save plain text password
        const hashed = await bcrypt.hash(password, 10);

        //create user and save the new user
        const user = new User({name, email, password: hashed});
        await user.save();

        //create jwt token
        const secret = process.env.JWT_SECRET;
        if (!secret) throw new Error('JWT_SECRET not defined');

        const token = jwt.sign({id: user._id}, secret, {expiresIn: '7d'});
        res.status(201).json({token, user: { id: user._id, name, email,} });
        
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({message: error.message});
        }
    }   
};

//login
export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const {email, password} = req.body as {
            email: string; 
            password: string;
        };  
    
    //find user by email
    const user = await User.findOne({email});
    if(!user){ 
        res.status(400).json({message: 'No account with this email' });
        return;
    }

    //compare password with hashed password in database
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        res.status(400).json({message: 'Wrong Password'})
        return;
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error('JWT_SECRET not defined');

    const token = jwt.sign({ id: user._id }, secret, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};