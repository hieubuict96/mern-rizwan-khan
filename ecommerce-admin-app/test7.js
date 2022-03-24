var Person, Story = {};

const author = new Person({
    _id: new mongoose.Types.ObjectId(),
    name: 'Ian Fleming',
    age: 50
  });
  
  author.save(function (err) {
    if (err) return handleError(err);
  
    const story1 = new Story({
      title: 'Casino Royale',
      author: author._id    // assign the _id from the person
    });
  
    story1.save(function (err) {
      if (err) return handleError(err);
      // that's it!
    });
  });

  Story.
  findOne({ title: 'Casino Royale' }).
  populate('author').
  exec(function (err, story1) {
    if (err) return handleError(err);
    console.log('The author is %s', story1.author.name);
    // prints "The author is Ian Fleming"
  });