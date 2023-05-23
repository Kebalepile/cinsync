import styles from "@/styles/about.module.css";
import Footer from "@/components/Footer";
export default function about() {
  return (
    <div className={styles.main}>
      <h3>About</h3>
      <br />
      <p>
        Welcome to our MP3 and MP4 web app! Our app allows you to easily play
        and manage your MP3 and MP4 files across all devices. With a
        user-friendly interface and powerful features, you can enjoy your
        favorite music and videos like never before. Some of the features of our
        app include: Support for both MP3 and MP4 files Easy-to-use playback
        controls Advanced search and filtering options And much more! We are
        constantly working to improve our app and add new features. If you have
        any suggestions or feedback, please don’t hesitate to contact us.
      </p>
      <br />
      <Footer />
    </div>
  );
}
