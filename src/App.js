import React, { useState } from 'react';
import { Input, Button, message } from 'antd';
import './App.css';

const App = () => {
  const [page, setPage] = useState('home');
  const [otr, setOtr] = useState('');
  const [dp, setDp] = useState('');
  const [jw, setJw] = useState('');
  const [principal, setPrincipal] = useState(null);
  const [angBulanan, setAngBulanan] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();

  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'Input tidak boleh ada yang kosong!',
    });
  };
  
  const principalTotal = () => {
    const cleanStrOtr = otr.replace(/[^0-9]/g, '');
    const cleanStrDp = dp.replace(/[^0-9]/g, '');
    if (cleanStrOtr && cleanStrDp) {
      const total = Number(cleanStrOtr) - Number(cleanStrDp);
      setPrincipal(total);
      setPage('tenor');
    } else {
      error();
    }
  };

  const countmonthlyInstallment = () => {
    const tenor = Number(jw);
    if (!principal || tenor <= 0) {
      error();
      return;
    }

    let bunga = 0;

    if (tenor <= 12) {
      bunga = 0.12;
    } else if (tenor <= 24) {
      bunga = 0.14;
    } else {
      bunga = 0.165;
    }

    const bungTotal = principal * bunga * 1;
    const totPembayaran = principal + bungTotal;
    const total = totPembayaran / tenor;
    setAngBulanan(total);
  };

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
          {contextHolder}
            <h1>IMS FINANCE</h1>
            <div className="inputs">
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px'}}>
              <text>Rp</text>
              <Input
                // id="otr"
                type="text"
                value={otr}
                onChange={handleOtrChange}
                placeholder="Input OTR"
              />
              
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px'}}>
              <text>Rp</text>
              <Input
                // id="dp"
                type="text"
                value={dp}
                onChange={handleDpChange}
                placeholder="Input DP"
              />
              </div>
            </div>
            <Button type='primary' onClick={principalTotal}>Lanjut</Button>
          </>
        );
      case 'tenor':
        return (
          <>
          {contextHolder}
            <h1>Pilih Jangka Waktu</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px'}}>
            <Input
              id="jw"
              type="number"
              min={1}
              max={100}
              value={jw}
              onChange={(e) => setJw(e.target.value)}
            />
            <text>Bulan</text>
            </div>
            <div className="buttons-tenor">
              <Button type='primary' onClick={countmonthlyInstallment}>Submit</Button>
              <Button type='default' onClick={() => setPage('home')}>Kembali</Button>
            </div>
            <div>
              <h1>Angsuran Bulanan</h1>
              <p style={{ fontSize: '20px', fontWeight: 'bold' }}>
                {angBulanan && formatToRupiah(angBulanan)} 
              </p>
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
