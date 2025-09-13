import "./Profile.css";

function Profile() {
  return (
    <div className="profile-container">
      <h1>Aleksandra Gluhhova</h1>
      <ul>
        <li>Cycling</li>
        <li>Traveling</li>
        <li>Coding</li>
      </ul>
      <form>
        <input type="email" placeholder="Your email" />
        <textarea placeholder="Your message"></textarea>
        <button type="button">Send</button>
      </form>
    </div>
  );
}

export default Profile;