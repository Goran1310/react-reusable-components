# 🎯 React Hook Form + Yup Validation Guide

## 📦 The Three Pieces

### 1️⃣ **react-hook-form**
Main form-handling library that provides the "engine" powering the form.

**Handles:**
- Input registration (collecting values)
- Validation triggering
- Error handling
- Form submission
- Minimal re-renders for great performance

**Key hooks:**
```javascript
const {
  register,        // Connect inputs to form
  handleSubmit,    // Handle form submission
  formState,       // Access errors, isValid, isSubmitting, etc.
  reset,           // Clear form
  watch,           // Watch specific fields
  setValue,        // Programmatically set values
} = useForm();
```

### 2️⃣ **@hookform/resolvers**
A bridge that lets React Hook Form use external validation libraries like Yup or Zod.

**Purpose:**
- Connects your validation schema to React Hook Form
- Enables schema-based validation (cleaner and reusable)
- Without it, RHF can only do basic validation (required, min, maxLength)

### 3️⃣ **Yup**
A schema validation library - the "rules layer" that describes what "valid data" looks like.

**Capabilities:**
- Define field types, requirements, min/max, patterns
- Return structured errors when data doesn't match
- Reusable schemas (can use server-side or in tests)

---

## ⚙️ How They Fit Together

```
User Input 
    ↓
React Hook Form (collects values)
    ↓
@hookform/resolvers (sends values to Yup)
    ↓
Yup Schema (validates data)
    ↓
React Hook Form (reports errors back to UI)
```

---

## 🚀 Quick Start

### Installation
```bash
npm install react-hook-form @hookform/resolvers yup
```

### Basic Setup
```jsx
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// 1. Define schema
const schema = yup.object({
  email: yup.string().email().required(),
  age: yup.number().min(18).required(),
}).required();

// 2. Connect to form
const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: yupResolver(schema),
});

// 3. Handle submission
const onSubmit = (data) => console.log(data);

// 4. Render
return (
  <form onSubmit={handleSubmit(onSubmit)}>
    <input {...register("email")} />
    <p>{errors.email?.message}</p>
    <button type="submit">Submit</button>
  </form>
);
```

---

## 📋 Common Validation Patterns

### String Validations
```javascript
yup.string()
  .required("This field is required")
  .min(3, "Must be at least 3 characters")
  .max(50, "Cannot exceed 50 characters")
  .email("Must be valid email")
  .url("Must be valid URL")
  .matches(/^[A-Z]/, "Must start with uppercase letter")
  .lowercase("Must be lowercase")
  .uppercase("Must be uppercase")
  .trim("No leading/trailing spaces")
```

### Number Validations
```javascript
yup.number()
  .typeError("Must be a number")
  .required("Age is required")
  .min(0, "Must be at least 0")
  .max(120, "Cannot exceed 120")
  .positive("Must be positive")
  .negative("Must be negative")
  .integer("Must be a whole number")
  .lessThan(100, "Must be less than 100")
  .moreThan(18, "Must be more than 18")
```

### Boolean Validations
```javascript
yup.boolean()
  .oneOf([true], "Must accept terms")
  .required("This checkbox is required")
```

### Date Validations
```javascript
yup.date()
  .required("Date is required")
  .min(new Date(), "Date must be in the future")
  .max("2025-12-31", "Date cannot be after 2025")
```

### Array Validations
```javascript
yup.array()
  .of(yup.number())  // Array of numbers
  .min(1, "Must have at least one item")
  .max(5, "Cannot have more than 5 items")
  .required("At least one selection required")
```

### Object Validations
```javascript
yup.object({
  street: yup.string().required(),
  city: yup.string().required(),
  zipCode: yup.string().matches(/^\d{5}$/),
})
```

---

## 🎨 Advanced Patterns

### Conditional Validation
```javascript
const schema = yup.object({
  hasPhone: yup.boolean(),
  phone: yup.string().when("hasPhone", {
    is: true,
    then: (schema) => schema.required("Phone is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
});
```

### Custom Validation
```javascript
const schema = yup.object({
  password: yup.string()
    .required()
    .test("strong-password", "Password is too weak", (value) => {
      return /[A-Z]/.test(value) && /[0-9]/.test(value) && /[!@#$%^&*]/.test(value);
    }),
});
```

### Password Confirmation
```javascript
const schema = yup.object({
  password: yup.string().min(8).required(),
  confirmPassword: yup.string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm password"),
});
```

### Dynamic Field Validation
```javascript
const schema = yup.object({
  accountType: yup.string().oneOf(["personal", "business"]),
  companyName: yup.string().when("accountType", {
    is: "business",
    then: (schema) => schema.required("Company name required for business accounts"),
  }),
});
```

---

## 🔧 useForm Configuration Options

```javascript
const { register, handleSubmit } = useForm({
  // Validation mode
  mode: "onChange",        // Validate on change
  // mode: "onBlur",       // Validate when field loses focus
  // mode: "onSubmit",     // Validate only on submit (default)
  // mode: "onTouched",    // Validate after blur, then on change
  // mode: "all",          // Validate on blur and change

  // Default values
  defaultValues: {
    email: "",
    age: 0,
  },

  // Validation resolver
  resolver: yupResolver(schema),

  // Re-validate after submit
  reValidateMode: "onChange",

  // Reset on submit success
  shouldFocusError: true,
});
```

---

## 💡 Benefits of This Setup

| Feature | Explanation |
|---------|-------------|
| **Fast & Lightweight** | RHF uses uncontrolled inputs - minimal re-renders |
| **Declarative Rules** | All validation in one schema |
| **Reusable** | Same Yup schema works server-side or in tests |
| **Type-Safe** | Works excellently with TypeScript |
| **Clean UI** | Errors appear directly under fields |
| **Developer Experience** | Clear, predictable error handling |

---

## 🎯 Complete Example Categories

### 1. **User Registration Form**
```javascript
const registrationSchema = yup.object({
  username: yup.string().min(3).max(20).matches(/^[a-zA-Z0-9_]+$/).required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).matches(/[A-Z]/).matches(/[0-9]/).required(),
  confirmPassword: yup.string().oneOf([yup.ref("password")]).required(),
  age: yup.number().min(18, "Must be 18+").required(),
  terms: yup.boolean().oneOf([true], "Must accept terms"),
});
```

### 2. **Contact Form**
```javascript
const contactSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email().required(),
  phone: yup.string().matches(/^\+?[\d\s-()]+$/, "Invalid phone number"),
  subject: yup.string().required(),
  message: yup.string().min(10).max(500).required(),
});
```

### 3. **Payment Form**
```javascript
const paymentSchema = yup.object({
  cardNumber: yup.string().matches(/^\d{16}$/, "Must be 16 digits").required(),
  cardName: yup.string().required(),
  expiryDate: yup.string().matches(/^\d{2}\/\d{2}$/, "Format: MM/YY").required(),
  cvv: yup.string().matches(/^\d{3,4}$/, "Invalid CVV").required(),
  amount: yup.number().positive().required(),
});
```

### 4. **Profile Update Form**
```javascript
const profileSchema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  bio: yup.string().max(200, "Bio too long"),
  website: yup.string().url("Must be valid URL"),
  birthDate: yup.date().max(new Date(), "Cannot be in future"),
  country: yup.string().required(),
});
```

---

## 🐛 Common Issues & Solutions

### Issue: "typeError" not showing
**Solution:** Always use `.typeError()` for type conversions
```javascript
yup.number().typeError("Must be a number")
```

### Issue: Form submits with errors
**Solution:** Ensure resolver is connected
```javascript
const { ... } = useForm({
  resolver: yupResolver(schema), // Don't forget this!
});
```

### Issue: Errors not showing
**Solution:** Check `errors` object structure
```javascript
{errors.fieldName && <p>{errors.fieldName.message}</p>}
// or
<p>{errors.fieldName?.message}</p>
```

### Issue: Custom validation not working
**Solution:** Return boolean or throw ValidationError
```javascript
.test("custom", "Error message", (value) => {
  return value.length > 5; // Return true/false
})
```

---

## 📚 Additional Resources

- [React Hook Form Docs](https://react-hook-form.com/)
- [Yup GitHub](https://github.com/jquense/yup)
- [Validation Examples](https://react-hook-form.com/get-started#SchemaValidation)

---

## ✅ Quick Reference Card

```javascript
// Import
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Schema
const schema = yup.object({ /* fields */ }).required();

// Setup
const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: yupResolver(schema),
  mode: "onChange",
});

// Input
<input {...register("fieldName")} />

// Error
{errors.fieldName?.message}

// Submit
<form onSubmit={handleSubmit(onSubmit)}>
```

---

**Happy Validating! 🎉**
