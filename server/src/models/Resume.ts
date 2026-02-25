import mongoose, { Schema } from 'mongoose';
import { IResume } from '../types';

const resumeSchema = new Schema<IResume>(
  {
    user:  { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, default: 'My Resume' },

    personalInfo: {
      fullName: { type: String },
      email:    { type: String },
      phone:    { type: String },
      location: { type: String },
      linkedIn: { type: String },
      github:   { type: String },
      summary:  { type: String },
    },

    experience: [
      {
        company:     { type: String },
        position:    { type: String },
        startDate:   { type: String },
        endDate:     { type: String },
        current:     { type: Boolean },
        description: { type: String },
      },
    ],

    education: [
      {
        school:    { type: String },
        degree:    { type: String },
        field:     { type: String },
        startDate: { type: String },
        endDate:   { type: String },
      },
    ],

    skills: {
      technical: { type: [String] },
      soft:      { type: [String] },
    },

    atsScore: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<IResume>('Resume', resumeSchema);