import jwt from 'jsonwebtoken';

// Generate a token and send it to the client
export const generateToken = (res, user, message) => {
  const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
    expiresIn: '1d', // Token valid for 1 day
  });

  return res
    .status(200)
    .cookie('token', token, {
      httpOnly: true, // Prevent client-side JavaScript access
      sameSite: 'None', // Allow cross-site cookies
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    })
    .json({
      success: true,
      message,
      user,
      token
    });
};
