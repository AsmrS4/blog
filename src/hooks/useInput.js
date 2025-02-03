import { useState } from "react";
import { useValidation } from "./useValidation";

export const useInput = (initialValue, validations) => {
    const [value, setValue] = useState(initialValue);
    const valid = useValidation(value, validations);
    const onChange = (e) => {
        setValue(e.target.value);
    };
    
    return { value, onChange, setValue,...valid };
};