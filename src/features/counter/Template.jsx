import { createSlice } from "@reduxjs/toolkit";

export const templateslice = createSlice({
  name: "Template",
  initialState: {
    TemplateId: "",
    TemplateName: "Default Template Name",
    istemplateedit: false,
    Templatehtml: `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Preview</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        .content {
            padding: 20px;
            background-color: #ffffff;
            border-radius: 5px;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            color: #666666;
        }
    </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Email Preview</h1>
            </div>
            <div class="content">
                <p>This is a preview of how your email will look on a typical screen. You can customize the content of your email here.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur euismod justo at nunc placerat, ac laoreet sapien faucibus. Integer consectetur arcu non pharetra fermentum.</p>
                <p>Ut commodo risus at arcu mattis, id viverra odio fringilla. Donec id erat ut ipsum varius consequat non a elit.</p>
            </div>
            <div class="footer">
                <p>&copy; 2024 Your Company Name. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `,
  },
  reducers: {
    settemplatedetails: (state, action) => {
      state.TemplateName = action.payload.name;
      state.Templatehtml = action.payload.html;
      state.istemplateedit = action.payload.istemplateedit;
    },
    settemplatehtml: (state, action) => {
      state.Templatehtml = action.payload.html;
    },
    settemplatename: (state, action) => {
      state.TemplateName = action.payload.name;
    },
  },
});

// Action creators are generated for each case reducer function
export const { settemplatedetails, settemplatehtml, settemplatename } =
  templateslice.actions;
export default templateslice.reducer;
