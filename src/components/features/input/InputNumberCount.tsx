import { Minus, Plus } from "lucide-react";
import React from "react";

const InputNumberCount = ({
  number,
  setNumber,
}: {
  number: number;
  setNumber: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div className="flex border max-w-fit rounded-xl p-2 bg-background">
      <button
        className="max-w-fit"
        onClick={() => {
          if (number > 1) {
            setNumber((prev) => prev - 1);
          }
        }}
      >
        <Minus />
      </button>
      <input
        type="number"
        className="focus:outline-none w-12 text-center mx-3 bg-background"
        value={number}
        onChange={(e) => {
          setNumber(Number(e.target.value));
        }}
      />
      <button
        onClick={() => {
          setNumber((prev) => prev + 1);
        }}
      >
        <Plus />
      </button>
    </div>
  );
};

export default InputNumberCount;
