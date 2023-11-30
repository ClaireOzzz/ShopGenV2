import React, { useState, useEffect } from "react";
import Api from "./api";
import { client } from "@gradio/client";

const response_0 = await fetch("https://raw.githubusercontent.com/gradio-app/gradio/main/test/test_files/bus.png");
const exampleImage = await response_0.blob();

const ImageGenerationForm = () => {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(null);
  const [modelss, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState("");

  useEffect(() => {
    // Fetch the available models from your API endpoint
    
    const fetchModels = async () => {
      try {

       
        const app = await client("https://79c67b7467ac6c1889.gradio.live/", {
            headers: {
              Authorization: `Bearer ${Api}`,
            },
          });
        const result = await app.predict("/load_model", [	
                        'ClaireOzzz/allImages',	
                        'ClaireOzzz/PorcelainModel', // string  in 'Your custom model ID' Dropdown component
            ]);
        // const response = await client("https://79c67b7467ac6c1889.gradio.live/", {
        //   headers: {
        //     Authorization: `Bearer ${Api}`,
        //   },
        // });

        // if (!response.ok) {
        //   throw new Error("Failed to fetch models");
        // }

        // // const modelsData = await response.json();
        // const modelsData = await response.predict("/load_model", [		
        //    ' ClaireOzzz/PorcelainModel', // string  in 'Your custom model ID' Dropdown component
        // ]);

        setModels(result);
      } 
      catch (error) {
        console.error("Error fetching models:", error.message);
      }
    };

    //fetchModels();
  }, []);

  const handleModelChange = (event) => {
    setSelectedModel(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const input = event.target.elements.input.value;
    const imageInput = event.target.elements.imageInput.files[0];
    const negativePrompt = event.target.elements.negativePrompt.value;

    const formData = new FormData();
    formData.append("inputs", input);
    formData.append("negative_prompt", negativePrompt);
    formData.append("image", imageInput);
    formData.append("selected_model", selectedModel);

    try {
        const app = await client("https://79c67b7467ac6c1889.gradio.live/");
        const result = await app.predict("/infer", [		
            'ClaireOzzz/PorcelainModel',
            'null',
            '0.1',
           ' https://raw.githubusercontent.com/gradio-app/gradio/main/test/test_files/bus.png',
           "Hello!!",
           "Hello!!",
           'canny',
           '0.1',
           '1',
           '25',
            '-1',
        ]);
        console.log(result.data);
    //   const response = await fetch(
    //     "https://79c67b7467ac6c1889.gradio.live/",
    //     {
    //       method: "POST",
    //       headers: {
    //         Authorization: `Bearer ${Api}`,
    //       },
    //       body: formData,
    //     }
    //   );

    //   if (!response.ok) {
    //     throw new Error("Failed to generate image");
    //   }

    //   const blob = await response.blob();
    //   setOutput(URL.createObjectURL(blob));
    } 
    catch (error) {
      console.error("Error generating image:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container al-c mt-3">
      <h1>
        Stable <span>Diffusion</span>
      </h1>
      <p>
        Pellentesque vulputate dignissim enim, et sollicitudin massa
        pellentesque ut. Proin luctus dui ut sem varius eleifend.
      </p>
      <form className="gen-form" onSubmit={handleSubmit}>
        <div>
          <label>Select Model:</label>
          <select value={selectedModel} onChange={handleModelChange}>
            {/* {modelss.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))} */}
          </select>
        </div>
        <input type="text" name="input" placeholder="type your prompt here..." />
        <input type="file" name="imageInput" accept="image/*" />
        <textarea name="negativePrompt" placeholder="type your negative prompt here..."></textarea>
        <button type="submit">Generate</button>
      </form>
      {/* <div>
        {loading && <div className="loading">Loading...</div>}
        {!loading && output && (
          <div className="result-image">
            <img src={output} alt="art" />
          </div>
        )}
      </div> */}
    </div>
  );
};

export default ImageGenerationForm;
