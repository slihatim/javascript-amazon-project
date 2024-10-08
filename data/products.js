class Product{
  id;
  image;
  name;
  rating;
  priceCents;
  keywords;

  constructor(productDetails){
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
    this.keywords = productDetails.keywords;
  }

  formatedPrice(){
    return (this.priceCents/100).toFixed(2);
  }

  extraInfoHTML(){
    return '';
  }

}

class ClothingProduct extends Product {
  sizeChartLink;

  constructor(productDetails) {
    super(productDetails);

    this.sizeChartLink = productDetails.sizeChartLink;
  }

  extraInfoHTML(){
    return `<a href="images/clothing-size-chart.png" target="_blank">Size chart</a>`

  }
}


export let products = [];

export function loadProducts(){
  const promise = fetch('https://supersimplebackend.dev/products')
  .then((response) => {
    return response.json();
  
  }).then((productsData) => {
    products = productsData.map((productDetails) => {
      if(productDetails.type === 'clothing'){
        return new ClothingProduct(productDetails);
      }
      return new Product(productDetails);
    });

  })/*.catch((error) => {
    console.log('an error has occured, please try again');
    console.log(error);
  })*/

  return promise;
}

