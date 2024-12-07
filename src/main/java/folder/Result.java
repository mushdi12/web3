package folder;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Result {

    private double x, y, radius;
    private String inside;

    public Result(double x, double y, double radius, String inside) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.inside = inside;
    }

}