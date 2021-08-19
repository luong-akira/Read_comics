const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
var slug = require('mongoose-slug-generator');
const mongoosePaginate = require('mongoose-paginate-v2');
mongoose.plugin(slug);

const comicSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  name: {
    type: 'String',
    required: true,
  },
  chapters: [
    {
      name: {
        type: String,
        required: true,
      },
      embededLink: {
        type: [String],
        required: true,
      },
      slug: String,
      date: {
        type: Date,
        default: Date.now,
      },
      counter: {
        type: Number,
        default: 0,
      },
    },
  ],
  genres: [String],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
      username: {
        type: String,
      },
      comment: {
        type: String,
        validate(val) {
          if (!validator.isLength(val, { min: 2 })) {
            throw new Error('Comment must have at least 2 characters');
          }
        },
      },
      reply: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: 'users',
          },
          username: {
            type: String,
          },
          comment: {
            type: String,
            validate(val) {
              if (!validator.isLength(val, { min: 2 })) {
                throw new Error('Comment must have at least 2 characters');
              }
            },
          },
          date: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      likes: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: 'users',
          },
        },
      ],
      dislikes: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: 'users',
          },
        },
      ],
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  isCompleted: {
    type: Boolean,
    default: 'false',
  },

  slug: { type: String, slug: 'name' },
  date: {
    type: Date,
    default: Date.now,
  },
  totalCount: {
    type: Number,
    default: 0,
  },
  rating: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
      value: {
        type: Number,
      },
    },
  ],
  averageRating: {
    type: Number,
    default: 0,
  },
});

comicSchema.plugin(mongoosePaginate);

const Comic = mongoose.model('Comic', comicSchema);

Comic.paginate().then({});

module.exports.Comic = Comic;
