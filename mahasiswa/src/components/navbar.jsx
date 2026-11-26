function Navbar({ activeMenu, setActiveMenu, totalMahasiswa }) {
  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '14px 28px',
        backgroundColor: '#16181d',
        borderBottom: '1px solid #2d3139',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '1.15rem', fontWeight: '700', color: '#f9fafb' }}>
          Manajemen Data Mahasiswa
        </span>
        <span
          style={{
            backgroundColor: '#252830',
            color: '#93c5fd',
            fontSize: '0.8rem',
            padding: '2px 8px',
            borderRadius: '999px',
            fontWeight: '600',
          }}
        >
          {totalMahasiswa} Data
        </span>
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          type="button"
          onClick={() => setActiveMenu('list')}
          style={{
            padding: '8px 16px',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: '600',
            backgroundColor: activeMenu === 'list' ? '#2563eb' : '#252830',
            color: activeMenu === 'list' ? '#ffffff' : '#d1d5db',
          }}
        >
          Daftar Mahasiswa
        </button>

        <button
          type="button"
          onClick={() => setActiveMenu('tambah')}
          style={{
            padding: '8px 16px',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: '600',
            backgroundColor: activeMenu === 'tambah' ? '#2563eb' : '#252830',
            color: activeMenu === 'tambah' ? '#ffffff' : '#d1d5db',
          }}
        >
          + Tambah Data
        </button>
      </div>
    </nav>
  );
}

export default Navbar;