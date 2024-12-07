package folder;

public class Validator {

    String checksPoint(double x, double y, double radius) {
        if (checkCircle(x, y, radius) || checkTriangle(x, y, radius) || checkSquare(x, y, radius)) {
            return "Внутри";
        }
        return "Вне";
    }

    boolean checkSquare(double x, double y,double r) {
        return  -r <= x && x <= 0 && y >= 0 && y <= r/2 ;
    }

    boolean checkTriangle(double x, double y,double r) {
        return x >= 0 && y >= 0 && y + x/2 <= r/2;
    }

    boolean checkCircle(double x, double y,double r) {
        return  x*x + y*y <= (r/2*r/2)  && x <=0 && y <=0;
    }
}
