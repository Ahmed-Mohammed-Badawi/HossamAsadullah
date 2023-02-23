import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    mainImage: {
        type: {
            url: String,
            public_id: String
        },
        required: [true, 'Please Enter the post main image']
    },
    header: {
        type: String,
        required: [true, 'Please Enter the Post Header'],
    },
    postData: {
        type: {},
        required: [true, 'Please Enter the Post Data']
    },
    published: {
        type: Boolean,
        default: true
    },
    category: {
        type: [String],
        required: [true, 'Please Enter the Post Category']
    },
    createdOnServerAt: {
        type: Date,
        default: () => new Date(),
    },
});

export default mongoose.models.Posts || mongoose.model("Posts", PostSchema);
