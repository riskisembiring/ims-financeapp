import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [page, setPage] = useState('home');
  const [otr, setOtr] = useState('');
  const [dp, setDp] = useState('');
  const [jw, setJw] = useState('');
  const [principal, setPrincipal] = useState(null);
  const [angBulanan, setAngBulanan] = useState(null);

  const principalTotal = () => {
    const cleanStrOtr = otr.replace(/[^0-9]/g, '')
    const cleanStrDp = dp.replace(/[^0-9]/g, '')
    if (cleanStrOtr && cleanStrDp) {
      const total = Number(cleanStrOtr - cleanStrDp);
      setPrincipal(total);
      setPage('tenor');
    } else { 
      alert("Input tidak valid");
    }
  };

  const countmonthlyInstallment = () => {
    if (jw <= 12) {
      const bungTotal = principal * 0.12 * 1;
      const totPembayaran = principal + bungTotal;
      const total = totPembayaran / jw
      setAngBulanan(total);
    }
    if (jw > 12 && jw <= 24) {
      const bungTotal = principal * 0.14 * 1;
      const total = principal + bungTotal;
      setAngBulanan(total);
    }
    if (jw > 24) {
      const bungTotal = principal * 0.165 * 1;
      const totPembayaran = principal + bungTotal;
      const total = totPembayaran / jw
      setAngBulanan(total);
    }
  }

  const formatNumber = (num) => {
    if (!num) return '';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const cleanNumber = (formattedNum) => {
    return formattedNum.replace(/[^0-9]/g, '');
  };

  const handleOtrChange = (e) => {
    const rawValue = e.target.value;
    const numericValue = cleanNumber(rawValue);
    setOtr(formatNumber(numericValue));
  };

  const handleDpChange = (e) => {
    const rawValue = e.target.value;
    const numericValue = cleanNumber(rawValue);
    setDp(formatNumber(numericValue));
  };

  const formatToRupiah = (num) => {
    return 'Rp. ' + new Intl.NumberFormat('id-ID').format(num);
  };

  const renderPage = () => {
    switch (page) {
      case 'home':
        return (
          <>
            <h1>MY FINANCE</h1>
            <div className="inputs">
              <input
                id="otr"
                type="text"
                value={otr}
                onChange={handleOtrChange}
                placeholder="Input OTR"
              />
              <input
                id="dp"
                type="text"
                value={dp}
                onChange={handleDpChange}
                placeholder="Input DP"
              />
            </div>
            <button onClick={principalTotal}>OK</button>
          </>
        );
      case 'tenor':
        return (
          <>
            <h1>Pilih Jangka Waktu</h1>
            <input
                id="jw"
                type="number"
                min={0}
                max={100}
                value={jw}
                onChange={(e) => setJw(e.target.value)}
                placeholder="Input Tenor"
              />
                <div className='buttons-tenor'>
                  <button onClick={countmonthlyInstallment}>OK</button>
                  <button onClick={() =>setPage('home')}>Batal</button>
                </div>
                <div> <h1>Angsuran Bulanan</h1>
                <p style={{ fontWeight: 'bold' }}>{angBulanan && formatToRupiah(angBulanan)}</p>
                </div>           
          </>
        );
      default:
        return <h1>Halaman Tidak Ditemukan</h1>;
    }
  };

  return <div className="App">{renderPage()}</div>;
};

export default App;
