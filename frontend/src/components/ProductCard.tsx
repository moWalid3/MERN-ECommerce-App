import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import type { IProduct } from "../types/Product";

interface Props {
  product: IProduct;
}

const ProductCard = ({ product }: Props) => {
  return (
    <>
      <Card sx={{boxShadow: "rgba(0, 0, 0, 0.13) 0px 1px 4px"}}>
        <CardMedia sx={{ height: 200, backgroundSize: "contain", my: 3}} image={product.image} />
        <CardContent>
          <Typography variant="h6" component="div">
            {product.title}
          </Typography>
          <Typography gutterBottom variant="body1" sx={{ color: "text.secondary" }}>
            {product.category}
          </Typography>
          <Typography variant="h5" className="price" sx={{ color: "warning" }}>
            ${product.price}
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="outlined" color="info" sx={{width: "100%"}} >Add To Cart</Button>
        </CardActions>
      </Card>
    </>
  );
};

export default ProductCard;
