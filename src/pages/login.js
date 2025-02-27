export const login = () => {
  return(
    <form  className="form-container">
    <label>
      First Name:
      <input type="text" name="firstName" required />
    </label>

    <label>
      Last Name:
      <input type="text" name="lastName"  required />
    </label>

    <button type="submit">Submit</button>
  </form>

  );
}