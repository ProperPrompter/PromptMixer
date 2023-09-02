import React, { useRef } from 'react';
import './PromptDisplay.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PromptDisplay = ({ prompts }) => {
  const textAreaRef = useRef(null);

  // Filter out the empty strings and join the texts with a comma
  const promptText = prompts.filter((text) => text).join(', ');

  const copyToClipboard = (e) => {
    const range = document.createRange();
    range.selectNode(textAreaRef.current);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
  };

  // Display the prompt
  return (
    <div className="prompt">
      <div className="prompt-output" ref={textAreaRef} contentEditable={false}>
        <div className="prompt-text">{promptText}</div>
        <div className="button-copy-container">
          <button className="button-copy" onClick={copyToClipboard}>
            <FontAwesomeIcon icon="fa-copy" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromptDisplay;
