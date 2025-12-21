import MenuItem from "../components/MenuItem/MenuItem";
import { useNavigate } from "react-router-dom";

const WishlistView = ({ wishlist, onToggleWishlist }) => {
	const navigate = useNavigate();

	if (wishlist.length === 0) {
		return <p>Your wishlist is empty.</p>;
	}

	return (
		<div>
			<button onClick={() => navigate("/")}>← Back to menu</button>
			<h1>Wishlist</h1>

			{wishlist.map((dish) => (
				<MenuItem
					key={dish.idMeal}
					dish={dish}
					isWishlisted={true}
					onToggleWishlist={onToggleWishlist}
				/>
			))}
		</div>
	);
};

export default WishlistView;
