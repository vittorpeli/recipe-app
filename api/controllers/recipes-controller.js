import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.API_KEY
})

const generateRecipePrompt = (formData) => {
  const {ingredients, condiments, cookTime, mealType} = formData;

  return `I have these ingredients: ${ingredients.join(", ")} and these condiments: ${condiments.join(", ")}. Act as a chef and suggest a ${mealType} recipe I can cook in under ${cookTime} minutes. The response should be formatted like this: 
  **Title:** (name of the recipe)

  **Ingredients:**
  - (ingredient 1)
  - (ingredient 2)
  - ...

  **Cook Time:**
  (estimated cook time)

  **Instructions:**
  1. (instruction 1)
  2. (instruction 2)
  ...`;
}

async function createRecipe(req, res) {
  const { formData } = req.body;

  try {
    const prompt = generateRecipePrompt(formData)

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: prompt,
    });
    console.log('Generated Text:', response.choices[0].message);

    const recipeText = response.choices[0].message;
    const titleMatch = /Title:\s*(.*)/.exec(recipeText);
    const ingredientsMatch = /Ingredients:\s*([\s\S]+?)(?=Cook Time)/.exec(recipeText);
    const cookTimeMatch = /Cook Time:\s*(.*)/.exec(recipeText);
    const instructionsMatch = /Instructions:\s*([\s\S]+?)$/.exec(recipeText);

    if (!titleMatch || !ingredientsMatch || !cookTimeMatch || !instructionsMatch) {
      throw new Error('Recipe format not expected');
    }

    const recipeData = {
      name: titleMatch[1].trim(),
      ingredients: ingredientsMatch[1]
        .trim()
        .split(/\n|\r\n/)
        .map(ingredient => ingredient.trim()),
      condiments: formData.condiments,
      time: cookTimeMatch[1].trim(),
      instructions: instructionsMatch[1]
      .trim()
      .split(/\n|\r\n/)
      .map((instruction) => instruction.trim()),
    };

    res.json(recipeData);
  } catch (error) {
    console.error('Error calling OpenAI API:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export { createRecipe };