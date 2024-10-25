import Image from 'next/image'; 
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <div style={{
      backgroundColor: 'white',
      padding: '1rem 0',
      width: '100%',
      fontFamily: 'Inter, sans-serif',
      borderTop: '1px solid #eaeaea', // For divider line effect
    }}>
      <div style={{
        padding: '1.25rem',
        maxWidth: '1280px',
        margin: '0 auto',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ paddingLeft: '1rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginLeft: '0.25rem'
          }}>
            <Image alt="crystal ball" src="https://metaschool.so/_next/static/media/crystalball.074cad21.webp" width="20" height="20" />
            <span style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              lineHeight: '1',
              marginLeft: '0.5rem'
            }}>metaschool</span>
          </div>
        </div>

        <div style={{
          fontSize: '0.875rem',
          color: 'rgb(102, 102, 102)',
          textAlign: 'center',
          flex: 1,
          marginLeft: '8rem',
        }}>
          &copy; {new Date().getFullYear()} Metaschool. All rights reserved
        </div>

        <div style={{ paddingRight: '1rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end'
          }}>
            <span style={{ marginRight: '0.5rem' }}>Follow us on social</span>

            {/* Updated Links */}
            <Link href="https://discord.com/invite/vbVMUwXWgc" passHref>
              <Image src="https://metaschool.so/_next/static/media/discord-color-hd.c16c98e2.webp" alt="Discord" width="20" height="20" style={{ marginLeft: '0.5rem', cursor: 'pointer' }} />
            </Link>
            <Link href="https://twitter.com/0xmetaschool" passHref>
              <Image src="https://metaschool.so/_next/static/media/x-black-hd.e25a2b72.webp" alt="Twitter" width="17" height="17" style={{ marginLeft: '0.5rem', cursor: 'pointer' }} />
            </Link>
            <Link href="https://github.com/0xmetaschool" passHref>
              <Image src="https://metaschool.so/_next/static/media/github-black-hd.55a2f989.webp" alt="GitHub" width="19" height="19" style={{ marginLeft: '0.5rem', cursor: 'pointer' }} />
            </Link>
            <Link href="https://www.linkedin.com/company/0xmetaschool/" passHref>
              <Image src="https://metaschool.so/_next/static/media/linkedin-color-hd.e0e19119.webp" alt="LinkedIn" width="24" height="24" style={{ marginLeft: '0.5rem', cursor: 'pointer' }} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;