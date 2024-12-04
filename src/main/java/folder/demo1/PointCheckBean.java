package folder.demo1;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@ManagedBean(name = "pointCheckBean")
@SessionScoped
public class PointCheckBean implements Serializable {
    private double x;
    private double y;
    private double radius;
    private List<Result> results = new ArrayList<>();

    // Вспомогательный класс для хранения результатов
    public static class Result {
        private double x, y, radius;
        private boolean inside;

        public Result(double x, double y, double radius, boolean inside) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.inside = inside;
        }

        // Геттеры
        public double getX() { return x; }
        public double getY() { return y; }
        public double getRadius() { return radius; }
        public boolean isInside() { return inside; }
    }

    public void checkPoint() {
        boolean inside = (x >= 0 && y >= 0 && (x * x + y * y <= radius * radius));
        results.add(new Result(x, y, radius, inside));
    }

    // Геттеры и сеттеры
    public double getX() { return x; }
    public void setX(double x) { this.x = x; }

    public double getY() { return y; }
    public void setY(double y) { this.y = y; }

    public double getRadius() { return radius; }
    public void setRadius(double radius) { this.radius = radius; }

    public List<Result> getResults() { return results; }

    public String getCurrentTime() {
        return LocalDateTime.now().toString();
    }
}
