export const decodeHTML = (str: string) => {
    const textArea = document.createElement('textarea'); // Create a temporary textarea
    textArea.innerHTML = str; // Set its HTML content
    return textArea.value; // Extract the decoded text
  };
  