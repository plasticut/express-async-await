### express-async-await

This module adds the ability to handle exceptions that raises in async route handlers.

```javascript
const {NotFound} = require('http-errors');
require('express-asyncawait');
const app = require('express')();

app.get('/user/:userId', async (req, res) => {
  const user = await User.findById(req.params.userId);

  if (!user) throw new NotFound('User not found.');

  res.status(200).json(user);
});
```