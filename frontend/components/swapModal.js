import React, { useState } from 'react';

function CryptoSwapModal() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  }

  const handleClose = () => {
    setIsOpen(false);
  }

  return (
    <div>
      <button onClick={handleOpen}>Swap Crypto</button>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Swap Crypto</h2>
              <button onClick={handleClose}>X</button>
            </div>
            <div className="modal-body">
              <form>
                <label>
                  From:
                  <select>
                    <option value="btc">BTC</option>
                    <option value="eth">ETH</option>
                    <option value="xrp">XRP</option>
                  </select>
                </label>
                <label>
                  To:
                  <select>
                    <option value="btc">BTC</option>
                    <option value="eth">ETH</option>
                    <option value="xrp">XRP</option>
                  </select>
                </label>
                <button type="submit">Swap</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CryptoSwapModal;
