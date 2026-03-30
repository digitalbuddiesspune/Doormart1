import mongoose from 'mongoose';

const contactInfoSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    companyName: {
      type: String,
      default: 'avfmcgdelivery',
      trim: true,
    },
  },
  { timestamps: true }
);

// Ensure only one contact info document exists
contactInfoSchema.statics.getContactInfo = async function () {
  let contactInfo = await this.findOne();
  if (!contactInfo) {
    contactInfo = await this.create({
      email: 'support@avfmcgdelivery.com',
      phone: '+91 98765 43210',
      address: 'avfmcgdelivery Headquarters, 123 Playful Lane, Mumbai, India 400001',
      companyName: 'avfmcgdelivery',
    });
  }
  return contactInfo;
};

const ContactInfo = mongoose.models.ContactInfo || mongoose.model('ContactInfo', contactInfoSchema);

export default ContactInfo;








