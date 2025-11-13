import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Navbar from "./components/Navbar";

/**
 * 🎯 Complete Form Validation Example
 * 
 * Three-piece validation system:
 * 1️⃣ react-hook-form - Form handling engine
 * 2️⃣ @hookform/resolvers - Bridge between RHF and Yup
 * 3️⃣ Yup - Schema validation rules
 */

// ✅ 1. Define validation schema with Yup
const schema = yup.object({
  // Numeric validations
  age: yup
    .number()
    .typeError("Age must be a number")
    .required("Age is required")
    .min(0, "Age must be at least 0")
    .max(120, "Age cannot exceed 120")
    .integer("Age must be a whole number"),
  
  weight: yup
    .number()
    .typeError("Weight must be a number")
    .required("Weight is required")
    .positive("Weight must be positive")
    .max(500, "Weight seems unrealistic"),
  
  // Text validations
  username: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username cannot exceed 20 characters")
    .matches(/^[a-zA-Z0-9_]+$/, "Only letters, numbers and underscores allowed"),
  
  email: yup
    .string()
    .required("Email is required")
    .email("Must be a valid email address"),
  
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number"),
  
  // Boolean validation
  terms: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions"),
}).required();

// ✅ 2. Use the schema with react-hook-form via yupResolver
export default function AppTest() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm({
    resolver: yupResolver(schema), // Connect Yup to React Hook Form
    mode: "onChange", // Validate on change for instant feedback
  });

  // ✅ 3. Handle valid form submission
  const onSubmit = async (data) => {
    console.log("✅ Valid form data:", data);
    alert(`Form submitted successfully!\n\nData:\n${JSON.stringify(data, null, 2)}`);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    reset(); // Clear form after submission
  };

  // ✅ 4. Render the form with error handling
  return (
    <>
      <Navbar />
      <div style={styles.container}>
      <h1 style={styles.title}>🎯 Form Validation Demo</h1>
      <p style={styles.subtitle}>
        React Hook Form + Yup Validation
      </p>

      <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
        
        {/* Username Field */}
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Username *</label>
          <input
            {...register("username")}
            placeholder="Enter username (3-20 chars)"
            style={errors.username ? styles.inputError : styles.input}
          />
          {errors.username && (
            <p style={styles.error}>❌ {errors.username.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Email *</label>
          <input
            {...register("email")}
            type="email"
            placeholder="your@email.com"
            style={errors.email ? styles.inputError : styles.input}
          />
          {errors.email && (
            <p style={styles.error}>❌ {errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Password *</label>
          <input
            {...register("password")}
            type="password"
            placeholder="Min 8 chars, 1 upper, 1 lower, 1 number"
            style={errors.password ? styles.inputError : styles.input}
          />
          {errors.password && (
            <p style={styles.error}>❌ {errors.password.message}</p>
          )}
        </div>

        {/* Age Field */}
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Age *</label>
          <input
            {...register("age")}
            type="number"
            placeholder="Enter age (0-120)"
            style={errors.age ? styles.inputError : styles.input}
          />
          {errors.age && (
            <p style={styles.error}>❌ {errors.age.message}</p>
          )}
        </div>

        {/* Weight Field */}
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Weight (kg) *</label>
          <input
            {...register("weight")}
            type="number"
            step="0.1"
            placeholder="Enter weight in kg"
            style={errors.weight ? styles.inputError : styles.input}
          />
          {errors.weight && (
            <p style={styles.error}>❌ {errors.weight.message}</p>
          )}
        </div>

        {/* Terms Checkbox */}
        <div style={styles.checkboxGroup}>
          <label style={styles.checkboxLabel}>
            <input
              {...register("terms")}
              type="checkbox"
              style={styles.checkbox}
            />
            <span>I accept the terms and conditions *</span>
          </label>
          {errors.terms && (
            <p style={styles.error}>❌ {errors.terms.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          style={isSubmitting ? styles.buttonDisabled : styles.button}
        >
          {isSubmitting ? "Submitting..." : "Submit Form"}
        </button>

        {/* Form Status */}
        <div style={styles.status}>
          <p style={{ color: isValid ? "#28a745" : "#ffc107", margin: "0.5rem 0" }}>
            {isValid ? "✅ Form is valid" : "⚠️ Please fix errors above"}
          </p>
        </div>
      </form>

      {/* Info Panel */}
      <div style={styles.infoPanel}>
        <h3>🧠 How This Works:</h3>
        <ol style={{ textAlign: "left", lineHeight: "1.8" }}>
          <li><strong>react-hook-form</strong> - Collects values & manages form state</li>
          <li><strong>@hookform/resolvers</strong> - Bridges RHF to Yup</li>
          <li><strong>Yup schema</strong> - Validates data against rules</li>
          <li><strong>Errors</strong> - Displayed instantly via formState.errors</li>
        </ol>
        <p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#666" }}>
          💡 Try submitting with invalid data to see validation in action!
        </p>
      </div>
    </div>
    </>
  );
}

// 🎨 Styles
const styles = {
  container: {
    padding: "2rem",
    maxWidth: "600px",
    margin: "0 auto",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  title: {
    color: "#61DAFB",
    textAlign: "center",
    marginBottom: "0.5rem",
  },
  subtitle: {
    textAlign: "center",
    color: "#adb5bd",
    marginBottom: "2rem",
  },
  form: {
    backgroundColor: "#21222A",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  fieldGroup: {
    marginBottom: "1.5rem",
  },
  label: {
    display: "block",
    fontWeight: "600",
    marginBottom: "0.5rem",
    color: "#f8f9fa",
  },
  input: {
    width: "100%",
    padding: "0.75rem",
    fontSize: "1rem",
    border: "2px solid #495057",
    borderRadius: "4px",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
    backgroundColor: "#1a1b21",
    color: "#f8f9fa",
  },
  inputError: {
    width: "100%",
    padding: "0.75rem",
    fontSize: "1rem",
    border: "2px solid #dc3545",
    borderRadius: "4px",
    boxSizing: "border-box",
    backgroundColor: "#2d1a1c",
    color: "#f8f9fa",
  },
  error: {
    color: "#ff6b6b",
    fontSize: "0.875rem",
    marginTop: "0.25rem",
    marginBottom: 0,
  },
  checkboxGroup: {
    marginBottom: "1.5rem",
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    cursor: "pointer",
    color: "#f8f9fa",
  },
  checkbox: {
    width: "18px",
    height: "18px",
    cursor: "pointer",
  },
  button: {
    width: "100%",
    padding: "1rem",
    fontSize: "1rem",
    fontWeight: "600",
    color: "white",
    backgroundColor: "#28a745",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  buttonDisabled: {
    width: "100%",
    padding: "1rem",
    fontSize: "1rem",
    fontWeight: "600",
    color: "white",
    backgroundColor: "#6c757d",
    border: "none",
    borderRadius: "4px",
    cursor: "not-allowed",
    opacity: 0.7,
  },
  status: {
    textAlign: "center",
    marginTop: "1rem",
    fontSize: "0.9rem",
    fontWeight: "500",
  },
  infoPanel: {
    marginTop: "2rem",
    padding: "1.5rem",
    backgroundColor: "#21222A",
    borderRadius: "8px",
    borderLeft: "4px solid #61DAFB",
  },
};
