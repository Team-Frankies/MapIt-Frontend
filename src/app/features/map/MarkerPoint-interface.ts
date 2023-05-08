class MarketPoint {
    private id: String | undefined;
    private coordinates: { lat: number; lng: number; } | undefined

    constructor(coordinates: { lat: number; lng: number; } , id:string ){
        this.id = id;
        this.coordinates = coordinates;
    }

    getI(){
        return this.id;
    }
    getCoordinates(){
        return this.coordinates;
    }
}
