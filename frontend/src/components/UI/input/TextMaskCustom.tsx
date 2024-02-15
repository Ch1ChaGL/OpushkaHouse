import React from 'react';
import MaskedInput from 'react-text-mask';

interface TextMaskCustomProps {
  inputRef: (ref: HTMLInputElement | null) => void;
}

const TextMaskCustom: React.FC<TextMaskCustomProps> = ({
  inputRef,
  ...other
}) => {
  return (
    <MaskedInput
      type='numeric'
      {...other}
      ref={(ref: any) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        '+',
        '7',
        '(',
        /\d/,
        /\d/,
        /\d/,
        ')',
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
      ]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
};

export default TextMaskCustom;
