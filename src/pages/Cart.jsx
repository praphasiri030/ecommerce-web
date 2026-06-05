import ListCart from "../components/card/ListCart";

const Cart = () => {
  return (
    <div className="bg-gradient-to-br from-sky/10 via-white to-pink/10 min-h-[calc(100vh-64px)] p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        <ListCart />
      </div>
    </div>
  );
};

export default Cart;