# Front-End Developer Test Project

This project demonstrates a dynamic input field system similar to block-based content editors (such as Notion), where users can type formatting commands to apply specific styles or insert formatted blocks.

## Key Functionalities

1. **Dynamic Input Creation:**

   - Users can start typing in the input field, and new input fields are generated dynamically when specific conditions are met (such as after pressing Enter).
   - Each new input has the same placeholder and functionalities as the original input, allowing for a continuous workflow.

2. **Formatting Shortcuts:**

   - Users can type `/` followed by a number or keyword to filter and select specific formatting options.
   - For example, typing `/1` applies the `Heading 1` format, while `/expandable-h1` applies an expandable heading.
   - A dropdown is triggered when the user types `/`, which filters available formatting options in real time.

3. **Dropdown for Block Selection:**

   - A dropdown menu appears when typing `/` that allows users to select predefined formatting options for headers or blocks.
   - Options include `Heading 1`, `Expandable Heading 1`, and more. Users can click to select an option, or they can use the shortcut `# + space` to quickly apply the format.

4. **Keyboard Interaction:**
   - Pressing "Enter" after selecting a block type from the dropdown or typing a valid formatting command creates a new block with the selected format.
   - Pressing "Backspace" clears the current input or removes the input block if it's empty, following the block's behavior in editors like Notion.
5. **Responsive Placeholder:**
   - The placeholder dynamically updates to reflect the selected format (e.g., "Heading 1"), ensuring users always know the active block type.
