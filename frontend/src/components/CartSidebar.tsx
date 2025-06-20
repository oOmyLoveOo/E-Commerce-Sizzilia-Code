import React, { useState } from 'react';
import { FiX, FiMinus, FiPlus, FiShoppingBag, FiLoader } from 'react-icons/fi';
import { useCart } from '../hooks/useCart';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
}

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-production-url.com' 
  : 'http://localhost:5000';

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose }) => {
  const { state, updateQuantity, removeItem, clearCart } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [showPaymentInstructions, setShowPaymentInstructions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string>('');
  const [bizumPhone, setBizumPhone] = useState('');
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    email: '',
    phone: ''
  });

  const handlePhoneChange = (value: string, field: 'phone' | 'bizum') => {
    const numericValue = value.replace(/\D/g, '');
    if (field === 'phone') {
      setCustomerInfo({...customerInfo, phone: numericValue});
    } else {
      setBizumPhone(numericValue);
    }
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(id, newQuantity);
    } else {
      removeItem(id);
    }
  };

  const handleCheckout = () => {
    if (state.items.length === 0) return;
    setShowCheckout(true);
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customerInfo.name || !customerInfo.email) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    if (!bizumPhone || bizumPhone.length !== 9) {
      alert('El número de Bizum debe tener exactamente 9 dígitos');
      return;
    }

    if (customerInfo.phone && customerInfo.phone.length !== 9) {
      alert('El teléfono debe tener exactamente 9 dígitos o déjalo vacío');
      return;
    }

    setIsLoading(true);

    try {
      const orderData = {
        customerInfo: {
          name: customerInfo.name.trim(),
          email: customerInfo.email.trim(),
          phone: customerInfo.phone.trim()
        },
        items: state.items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        total: state.total,
        bizumPhone: bizumPhone
      };

      const response = await fetch(`${API_BASE_URL}/api/orders/process-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error del servidor: ${response.status} - ${errorText}`);
      }

      const result = await response.json();

      if (response.ok) {
        setOrderNumber(result.orderNumber);
        setShowPaymentInstructions(true);
      } else {
        alert(result.error || 'Error al procesar el pedido');
      }
    } catch (error) {
      console.error('Error:', error);
      alert(error instanceof Error ? error.message : 'Error de conexión. Por favor intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentConfirmation = () => {
    alert('¡Pedido confirmado! Recibirás un email de confirmación en breve.');
    clearCart();
    setShowCheckout(false);
    setShowPaymentInstructions(false);
    setCustomerInfo({ name: '', email: '', phone: '' });
    setBizumPhone('');
    setOrderNumber('');
    onClose();
  };

  const resetForm = () => {
    setShowCheckout(false);
    setShowPaymentInstructions(false);
    setCustomerInfo({ name: '', email: '', phone: '' });
    setBizumPhone('');
    setOrderNumber('');
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-lg bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <FiShoppingBag />
              Carrito ({state.itemCount})
            </h2>
            <button
              onClick={() => {
                resetForm();
                onClose();
              }}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {!showCheckout && !showPaymentInstructions ? (
              // Cart Items
              <>
                {state.items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500">
                    <FiShoppingBag size={64} className="mb-4 opacity-30" />
                    <p>Tu carrito está vacío</p>
                  </div>
                ) : (
                  <div className="p-4 space-y-4">
                    {state.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-sm">{item.name}</h3>
                          <p className="text-blue-600 font-semibold">€{item.price.toFixed(2)}</p>
                          
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="p-1 hover:bg-gray-200 rounded"
                            >
                              <FiMinus size={14} />
                            </button>
                            <span className="px-2 py-1 bg-white border rounded text-sm min-w-[40px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="p-1 hover:bg-gray-200 rounded"
                            >
                              <FiPlus size={14} />
                            </button>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="ml-auto p-1 text-red-500 hover:bg-red-50 rounded"
                            >
                              <FiX size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : showCheckout && !showPaymentInstructions ? (
              // Customer Info Form
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-4">Información de contacto</h3>
                <form onSubmit={handlePayment} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                      className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                      className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Teléfono (opcional)
                    </label>
                    <input
                      type="tel"
                      value={customerInfo.phone}
                      onChange={(e) => handlePhoneChange(e.target.value, 'phone')}
                      placeholder="123456789"
                      maxLength={9}
                      className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={isLoading}
                    />
                    <p className="text-xs text-gray-500 mt-1">Solo números, 9 dígitos</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Número de Bizum *
                    </label>
                    <input
                      type="tel"
                      required
                      value={bizumPhone}
                      onChange={(e) => handlePhoneChange(e.target.value, 'bizum')}
                      placeholder="123456789"
                      maxLength={9}
                      className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={isLoading}
                    />
                    <p className="text-xs text-gray-500 mt-1">Número desde el que vas a pagar (9 dígitos)</p>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowCheckout(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      disabled={isLoading}
                    >
                      Volver
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <FiLoader className="animate-spin" size={16} />
                          Procesando...
                        </>
                      ) : (
                        'Continuar'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              // Payment Instructions
              <div className="p-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">
                    💸 Pagar por Bizum
                  </h3>
                  <div className="space-y-2 text-sm text-blue-700">
                    <p><strong>Número:</strong> {bizumPhone}</p>
                    <p><strong>Concepto:</strong> {orderNumber} - {customerInfo.name}</p>
                    <p><strong>Importe:</strong> €{state.total.toFixed(2)}</p>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-green-800 mb-2">✅ Pedido registrado</h4>
                  <p className="text-sm text-green-700">
                    Tu pedido <strong>{orderNumber}</strong> ha sido registrado correctamente. 
                    Te hemos enviado un email de confirmación.
                  </p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-yellow-800">
                    <strong>Importante:</strong> Realiza el pago por Bizum con el concepto exacto mostrado arriba. 
                    Una vez confirmemos el pago, te contactaremos para coordinar la entrega.
                  </p>
                </div>

                <button
                  onClick={handlePaymentConfirmation}
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  ✅ Entendido
                </button>

                <button
                  onClick={() => setShowPaymentInstructions(false)}
                  className="w-full mt-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Volver
                </button>
              </div>
            )}
          </div>

          {/* Footer - Total and Checkout */}
          {!showCheckout && !showPaymentInstructions && state.items.length > 0 && (
            <div className="border-t p-4 space-y-3">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total:</span>
                <span>€{state.total.toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Realizar Pedido
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;