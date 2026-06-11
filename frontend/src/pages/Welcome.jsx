import { useNavigate } from 'react-router-dom';
import { logout, getToken, decodeToken } from '../services/auth';

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: 'var(--color-canvas)',
    display: 'flex',
    flexDirection: 'column',
  },
  nav: {
    height: '64px',
    backgroundColor: 'var(--color-canvas)',
    borderBottom: '1px solid var(--color-hairline)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 var(--spacing-xxl)',
    position: 'sticky',
    top: 0,
    zIndex: 10,
  },
  navLogo: {
    fontSize: '16px',
    fontWeight: 600,
    color: 'var(--color-ink)',
    letterSpacing: '-0.3px',
  },
  navActions: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-lg)',
  },
  navUser: {
    fontSize: '14px',
    color: 'var(--color-charcoal)',
    fontWeight: 500,
  },
  logoutButton: {
    backgroundColor: 'var(--color-surface-elevated)',
    color: 'var(--color-ink)',
    border: '1px solid var(--color-hairline-strong)',
    borderRadius: 'var(--rounded-md)',
    padding: '8px 16px',
    height: '36px',
    fontSize: '14px',
    fontWeight: 500,
    fontFamily: 'inherit',
    cursor: 'pointer',
    transition: 'background-color 0.15s',
  },
  hero: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'var(--spacing-section) var(--spacing-xl)',
    position: 'relative',
    overflow: 'hidden',
  },
  glow: {
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '700px',
    height: '500px',
    background: 'radial-gradient(ellipse at top, var(--color-accent-orange-glow) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  heroContent: {
    textAlign: 'center',
    maxWidth: '600px',
    position: 'relative',
    zIndex: 1,
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--spacing-xs)',
    backgroundColor: 'var(--color-surface-elevated)',
    color: 'var(--color-body)',
    border: '1px solid var(--color-hairline-strong)',
    borderRadius: 'var(--rounded-full)',
    padding: '4px 12px',
    fontSize: '12px',
    fontWeight: 400,
    marginBottom: 'var(--spacing-xl)',
  },
  statusDot: {
    width: '8px',
    height: '8px',
    borderRadius: 'var(--rounded-full)',
    backgroundColor: 'var(--color-accent-green)',
    flexShrink: 0,
  },
  heading: {
    fontSize: '56px',
    fontWeight: 400,
    lineHeight: 1.1,
    letterSpacing: '-1.5px',
    color: 'var(--color-ink)',
    marginBottom: 'var(--spacing-xl)',
  },
  headingSpan: {
    color: 'var(--color-primary)',
  },
  description: {
    fontSize: '18px',
    fontWeight: 400,
    color: 'var(--color-body)',
    lineHeight: 1.5,
    marginBottom: 'var(--spacing-xxxl)',
  },
  tokenCard: {
    backgroundColor: 'var(--color-surface-card)',
    border: '1px solid var(--color-hairline-strong)',
    borderRadius: 'var(--rounded-lg)',
    padding: 'var(--spacing-xxl)',
    textAlign: 'left',
  },
  cardTitle: {
    fontSize: '12px',
    fontWeight: 500,
    color: 'var(--color-charcoal)',
    marginBottom: 'var(--spacing-md)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  cardValue: {
    fontSize: '14px',
    color: 'var(--color-body)',
    fontFamily: '"Geist Mono", "Fira Code", monospace',
    wordBreak: 'break-all',
    lineHeight: 1.6,
  },
  certBand: {
    borderTop: '1px solid var(--color-hairline)',
    position: 'relative',
    overflow: 'hidden',
  },
  certGlow: {
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '800px',
    height: '400px',
    background: 'radial-gradient(ellipse at top, var(--color-accent-blue-glow) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  certSection: {
    padding: 'var(--spacing-section) var(--spacing-xl)',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
    position: 'relative',
    zIndex: 1,
  },
  certSectionHeader: {
    textAlign: 'center',
    marginBottom: 'var(--spacing-xxxl)',
  },
  certSectionLabel: {
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: 'var(--color-surface-elevated)',
    color: 'var(--color-accent-blue)',
    border: '1px solid var(--color-hairline-strong)',
    borderRadius: 'var(--rounded-full)',
    padding: '4px 12px',
    fontSize: '12px',
    fontWeight: 500,
    marginBottom: 'var(--spacing-xl)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  certSectionTitle: {
    fontSize: '40px',
    fontWeight: 400,
    lineHeight: 1.1,
    letterSpacing: '-1px',
    color: 'var(--color-ink)',
    marginBottom: 'var(--spacing-xl)',
  },
  certSectionDesc: {
    fontSize: '18px',
    color: 'var(--color-body)',
    lineHeight: 1.5,
    maxWidth: '560px',
    margin: '0 auto',
  },
  certGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 'var(--spacing-lg)',
  },
  certCard: {
    backgroundColor: 'var(--color-surface-card)',
    border: '1px solid var(--color-hairline-strong)',
    borderRadius: 'var(--rounded-lg)',
    padding: 'var(--spacing-xxl)',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-md)',
  },
  certCardHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 'var(--spacing-sm)',
  },
  certCode: {
    fontFamily: '"Geist Mono", "Fira Code", monospace',
    fontSize: '12px',
    color: 'var(--color-accent-blue)',
    letterSpacing: '0.05em',
  },
  certLevelBadge: {
    fontSize: '11px',
    fontWeight: 500,
    borderRadius: 'var(--rounded-full)',
    padding: '2px 8px',
    whiteSpace: 'nowrap',
    flexShrink: 0,
  },
  certCardTitle: {
    fontSize: '16px',
    fontWeight: 500,
    color: 'var(--color-ink)',
    lineHeight: 1.4,
    letterSpacing: '-0.3px',
  },
  certCardDesc: {
    fontSize: '14px',
    color: 'var(--color-body)',
    lineHeight: 1.5,
    flex: 1,
  },
  certCardLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '13px',
    fontWeight: 500,
    color: 'var(--color-accent-blue)',
    marginTop: 'var(--spacing-sm)',
    textDecoration: 'none',
  },
};

const LEVEL_STYLES = {
  Principiante: { backgroundColor: 'rgba(17,255,153,0.12)', color: '#11ff99' },
  Intermedio: { backgroundColor: 'rgba(59,158,255,0.12)', color: '#3b9eff' },
  Experto: { backgroundColor: 'rgba(255,128,31,0.12)', color: '#ff801f' },
  Nuevo: { backgroundColor: 'rgba(255,32,71,0.12)', color: '#ff2047' },
};

const certifications = [
  {
    code: 'AI-103',
    name: 'Developing AI Apps and Agents on Azure',
    level: 'Nuevo',
    description:
      'Diseña, gestiona e implementa agentes y soluciones de IA usando Microsoft Foundry, Azure AI Services y modelos de lenguaje generativo.',
    url: 'https://learn.microsoft.com/credentials/certifications/azure-ai-engineer/',
  },
  {
    code: 'AZ-104',
    name: 'Azure Administrator Associate',
    level: 'Intermedio',
    description:
      'Implementa, gestiona y monitorea entornos Microsoft Azure: identidad, gobernanza, almacenamiento, cómputo y redes virtuales.',
    url: 'https://learn.microsoft.com/credentials/certifications/azure-administrator/',
  },
  {
    code: 'AZ-305',
    name: 'Azure Solutions Architect Expert',
    level: 'Experto',
    description:
      'Diseña soluciones cloud e híbridas en Azure incluyendo cómputo, redes, almacenamiento, monitoreo y seguridad a escala empresarial.',
    url: 'https://learn.microsoft.com/credentials/certifications/azure-solutions-architect/',
  },
  {
    code: 'DP-700',
    name: 'Fabric Data Engineer Associate',
    level: 'Intermedio',
    description:
      'Implementa y gestiona soluciones de ingeniería de datos a escala empresarial utilizando Microsoft Fabric y servicios de análisis.',
    url: 'https://learn.microsoft.com/credentials/certifications/fabric-data-engineering-associate/',
  },
  {
    code: 'SC-100',
    name: 'Cybersecurity Architect Expert',
    level: 'Experto',
    description:
      'Traduce estrategias de ciberseguridad en capacidades basadas en Zero Trust para proteger activos, aplicaciones e infraestructura.',
    url: 'https://learn.microsoft.com/credentials/certifications/cybersecurity-architect-expert/',
  },
  {
    code: 'PL-900',
    name: 'Power Platform Fundamentals',
    level: 'Principiante',
    description:
      'Comprende el valor de Power Apps, Power Automate, Power Pages y Copilot Studio para construir soluciones de bajo código.',
    url: 'https://learn.microsoft.com/credentials/certifications/power-platform-fundamentals/',
  },
];

export default function Welcome() {
  const navigate = useNavigate();

  const token = getToken();
  const payload = token ? decodeToken(token) : null;
  const username = payload?.sub || 'usuario';
  const expiresAt = payload?.exp
    ? new Date(payload.exp * 1000).toLocaleTimeString()
    : '—';

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <div style={styles.page}>
      <nav style={styles.nav}>
        <span style={styles.navLogo}>JWT Auth App</span>
        <div style={styles.navActions}>
          <span style={styles.navUser}>{username}</span>
          <button style={styles.logoutButton} onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </nav>

      <main style={styles.hero}>
        <div style={styles.glow} aria-hidden="true" />
        <div style={styles.heroContent}>
          <div style={styles.badge}>
            <span style={styles.statusDot} aria-hidden="true" />
            Sesión activa
          </div>

          <h1 style={styles.heading}>
            ¡Bienvenido,{' '}
            <span style={styles.headingSpan}>{username}</span>!
          </h1>

          <p style={styles.description}>
            Has iniciado sesión correctamente. Tu token JWT está almacenado en la sesión del navegador.
          </p>

          <div style={styles.tokenCard}>
            <p style={styles.cardTitle}>Token expira a las</p>
            <p style={styles.cardValue}>{expiresAt}</p>
          </div>
        </div>
      </main>

      <div style={styles.certBand}>
        <div style={styles.certGlow} aria-hidden="true" />
        <section style={styles.certSection}>
          <div style={styles.certSectionHeader}>
            <div style={styles.certSectionLabel}>Microsoft Learn 2026</div>
            <h2 style={styles.certSectionTitle}>Certificaciones Microsoft 2026</h2>
            <p style={styles.certSectionDesc}>
              Explora las certificaciones más relevantes de Microsoft para 2026,
              desde inteligencia artificial y cloud hasta seguridad y plataformas de datos.
            </p>
          </div>

          <div style={styles.certGrid}>
            {certifications.map((cert) => (
              <div key={cert.code} style={styles.certCard}>
                <div style={styles.certCardHeader}>
                  <span style={styles.certCode}>{cert.code}</span>
                  <span style={{ ...styles.certLevelBadge, ...LEVEL_STYLES[cert.level] }}>
                    {cert.level}
                  </span>
                </div>
                <h3 style={styles.certCardTitle}>{cert.name}</h3>
                <p style={styles.certCardDesc}>{cert.description}</p>
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.certCardLink}
                >
                  Ver certificación →
                </a>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
