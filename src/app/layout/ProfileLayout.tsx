import { Link, Outlet } from "react-router-dom";

export default function ProfileLayout() {
    return (
        <div className="container mx-auto">
        <h1>Profile</h1>
        <div className="grid grid-cols-5 gap-4 ">
            <div className="col-span-1 border p-4">
                <ul>
                    <li>
                        <Link to="/profile/">Profile Info</Link>
                    </li>
                    <li>
                        <Link to="/profile/orders">Orders</Link>
                    </li>
                    <li>
                        <Link to="/profile/notifications">Notifications</Link>
                    </li>
                    <li>
                        <Link to="/profile/wishlist">Wishlist</Link>
                    </li>
                </ul>
            </div>
            <div className="col-span-4 border p-4">
               <Outlet />
            </div>

        </div>
    </div>
    );
}