const { teal, grey } = require("@mui/material/colors");

const getDesignTokens = (mode) => ({
  palette: {
    mode,  // No need for @ts-ignore here, mode is supported

    ...(mode === "light"
      ? {
          // palette values for light mode
          ali: {
            main: "#64748B",  // custom color
          },

          favColor: {
            main: "rgb(247, 247, 247)",  // custom light mode color
          },
        }
      : {
          // palette values for dark mode
          ali: {
            main: teal[500],  // using MUI's teal color in supported format
          },

          favColor: {
            main: grey[900],  // using MUI's grey color for dark mode
          },
        }),
  },
});

export default getDesignTokens;
