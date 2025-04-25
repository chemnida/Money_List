import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('income');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [transactions, setTransactions] = useState([]);

  const handleAddTransaction = () => {
    if (text === '' || amount === '') return alert('내용과 금액을 입력해주세요');

    const newTransaction = {
      id: Date.now(),
      description: text,
      amount: parseInt(amount),
      type: type,
      date: new Date().toISOString().slice(0, 10)
    };

    setTransactions([...transactions, newTransaction]);
    setText('');
    setAmount('');
    setType('income');
  };

  const incomeTotal = transactions.reduce((acc, transaction) => {
    return transaction.type === "income" ? acc + transaction.amount : acc;
  }, 0);

  const expenseTotal = transactions.reduce((acc, transaction) => {
    return transaction.type === "expense" ? acc + transaction.amount : acc;
  }, 0);

  const balance = incomeTotal - expenseTotal;

  const openDeleteModal = (id) => {
    setSelectedId(id);
    setModalOpen(true);
  };

  const handleDelete = () => {
    setTransactions(transactions.filter(tx => tx.id !== selectedId));
    setModalOpen(false);
    setSelectedId(null);
  };

  return (
    <div className="box">
      <header>
        <h2>용돈 기입장</h2>
      </header>

      <div className="top">
        <div className="total">잔액 : {balance} 원</div>
        <div className="change">
          <div>수입 : {incomeTotal} 원</div>
          <div>지출 : {expenseTotal} 원</div>
        </div>
      </div>

      <div className="bottom">
        <div className="left">
          <h2>새로운 거래 추가</h2>
          <div>
            <h4>텍스트</h4>
            <input
              placeholder="내용 입력..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          <div>
            <label>
              <input
                type="radio"
                name="type"
                value="income"
                checked={type === "income"}
                onChange={(e) => setType(e.target.value)}
              /> 수입
            </label>
            <label>
              <input
                type="radio"
                name="type"
                value="expense"
                checked={type === "expense"}
                onChange={(e) => setType(e.target.value)}
              /> 지출
            </label>
          </div>

          <input
            placeholder="금액 입력..."
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <br />
          <button className="add" onClick={handleAddTransaction}>거래추가</button>
        </div>

        <div className="right">
          <h2>내역</h2>
          <div className="history-list">
            {transactions.map((tx) => (
              <div key={tx.id} style={{
                color: tx.type === 'income' ? 'green' : 'red',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span>{tx.description} {tx.type === 'income' ? '+' : '-'}{tx.amount}</span>
                <button
                  onClick={() => openDeleteModal(tx.id)}
                  style={{
                    marginLeft: '10px',
                    background: 'transparent',
                    border: 'none',
                    color: 'gray',
                    cursor: 'pointer'
                  }}>
                  🗑️
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {modalOpen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <p>정말 삭제하시겠습니까?</p>
            <button onClick={handleDelete} style={{ marginRight: '10px' }}>예</button>
            <button onClick={() => setModalOpen(false)}>아니오</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
