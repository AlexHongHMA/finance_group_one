// export default function Home() {
//   return <main>home page</main>;
// }

// // src/app/page.jsx <= added by AlexHong

import Link from 'next/link';
import styles from './Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        
      </header>
      <main className={styles.main}>
        <img src="/image.png" alt="Logo" className={styles.logo} /> 
        <h1 className={styles.title}>Welcome to Our Application</h1>
        <div className={styles.buttonContainer}>
          <a
            href="https://app.powerbi.com/view?r=eyJrIjoiYzg3NzczNzEtNWJmZC00YWZmLTk2OTMtNmI0OTVjYjNlZDliIiwidCI6IjZmNDQzMmRjLTIwZDItNDQxZC1iMWRiLWFjMzM4MGJhNjMzZCIsImMiOjEwfQ%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.button}
          >
            Power Bi Dashboard
          </a>
          <a
            href="https://125.25.183.177:1444/pivision/?fbclid=IwZXh0bgNhZW0CMTAAAR2jBcISl6DYyrI_-gt3lIiGkIMPmTXIoVMLszTwhVoI_1xkQAP1Q0qFyFA_aem_AaBZ7uiKNb6Em1rUM3yHNHNR9QCKsXu5u4Jn5UGKlbYeSa8yEMyRwZuy-4TqpMAekFCmFgzLSI_XA4rCGrN3bKXJ/#/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.button}
          >
            PI Vision
          </a>
        </div>
      </main>
      <footer className={styles.footer}>
        <p>© 2024 Company Name. All rights reserved.</p>
      </footer>
    </div>
  );
}


// import Navbar from '@/components/Layout/Navbar';
// import styles from './Home.module.css';

// export default function Home() {
//   return (
//     <div className={styles.container}>
//       <Navbar />
//       <main className={styles.main}>
//         <img src="/logo.png" alt="Logo" className={styles.middleLogo} />
//         <h1 className={styles.title}>Welcome to Our Application</h1>
//         <div className={styles.buttonContainer}>
//           <a
//             href="https://app.powerbi.com/view?r=eyJrIjoiYzg3NzczNzEtNWJmZC00YWZmLTk2OTMtNmI0OTVjYjNlZDliIiwidCI6IjZmNDQzMmRjLTIwZDItNDQxZC1iMWRiLWFjMzM4MGJhNjMzZCIsImMiOjEwfQ%3D%3D"
//             target="_blank"
//             rel="noopener noreferrer"
//             className={styles.button}
//           >
//             Financial Dashboard
//           </a>
//           <a
//             href="https://125.25.183.177:1444/pivision/?fbclid=IwZXh0bgNhZW0CMTAAAR2jBcISl6DYyrI_-gt3lIiGkIMPmTXIoVMLszTwhVoI_1xkQAP1Q0qFyFA_aem_AaBZ7uiKNb6Em1rUM3yHNHNR9QCKsXu5u4Jn5UGKlbYeSa8yEMyRwZuy-4TqpMAekFCmFgzLSI_XA4rCGrN3bKXJ/#/"
//             target="_blank"
//             rel="noopener noreferrer"
//             className={styles.button}
//           >
//             PI Vision
//           </a>
//         </div>
//       </main>
//       <footer className={styles.footer}>
//         <p>© 2024 Company Name. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// }






