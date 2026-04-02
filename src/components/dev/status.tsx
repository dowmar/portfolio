import React, { useEffect, useState } from 'react';
import { checkForUpdates, VersionDetails } from './checkforupdates';
import settings from '../../../src/content/_settings.json';

const DevelopmentNotice: React.FC = () => {
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [versionDetails, setVersionDetails] = useState<VersionDetails | null>(null);
    const [autoupdatecheck, setAutoupdatecheck] = useState<boolean | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const jsonAutoupdatecheck = settings?.autoupdatecheck || false;
            setAutoupdatecheck(jsonAutoupdatecheck);

            if (jsonAutoupdatecheck) {
                const details = await checkForUpdates();
                setVersionDetails(details);
            }

            const hasSeenNotice = localStorage.getItem('developmentNotice');
            if (!hasSeenNotice) {
                setShowPopup(true);
            }
        };

        fetchData();
    }, []);

    const handleHidePopup = () => {
        localStorage.setItem('developmentNotice', 'true');
        setShowPopup(false);
    };

    if (!showPopup) {
        return null;
    }

    return (
        <div
            style={{
                position: 'fixed',
                right: '24px',
                bottom: '24px',
                zIndex: 9999,
                maxWidth: '360px',
                width: 'calc(100vw - 32px)',
                padding: '1px',
                borderRadius: '24px',
                background: 'linear-gradient(135deg, rgba(80,176,209,0.65), rgba(159,212,109,0.45))',
                boxShadow: '0 24px 60px rgba(0, 0, 0, 0.28)',
            }}
        >
            <div
                style={{
                    borderRadius: '23px',
                    background: 'rgba(7, 16, 23, 0.92)',
                    color: '#f4f8fc',
                    backdropFilter: 'blur(16px)',
                    padding: '20px',
                }}
            >
                <p style={{ fontSize: '12px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8ab0c4', marginBottom: '10px' }}>
                    Quick note
                </p>
                <h2 style={{ fontSize: '22px', lineHeight: 1.2, marginBottom: '10px', fontWeight: 700 }}>
                    Portfolio is live and easier to browse.
                </h2>
                <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#d6e2ec', marginBottom: '16px' }}>
                    No captcha, no blocker. If you spot a bug, report it on{' '}
                    <a href="https://github.com/dowmar" target="_blank" rel="noopener noreferrer" style={{ color: '#7fd2ff' }}>
                        GitHub
                    </a>
                    .
                </p>
                {autoupdatecheck && (
                    <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#9fb3c7', marginBottom: '16px' }}>
                        {versionDetails
                            ? versionDetails.isLatestVersion
                                ? `Version ${versionDetails.currentVersion} is up to date.`
                                : `New release ${versionDetails.latestVersion} is available.`
                            : 'Checking latest release...'}
                        {versionDetails && !versionDetails.isLatestVersion ? (
                            <>
                                {' '}
                                <a href={versionDetails.releasesUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#9fd46d' }}>
                                    View release
                                </a>
                            </>
                        ) : null}
                    </p>
                )}
                <button
                    onClick={handleHidePopup}
                    style={{
                        background: 'linear-gradient(135deg, #9fd46d, #4db0d1)',
                        color: '#071017',
                        border: 'none',
                        padding: '11px 16px',
                        borderRadius: '999px',
                        cursor: 'pointer',
                        fontWeight: 700,
                    }}
                >
                    Dismiss
                </button>
            </div>
        </div>
    );
};

export default DevelopmentNotice;
