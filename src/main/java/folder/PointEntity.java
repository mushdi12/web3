package folder;

import dev.morphia.annotations.Entity;
import dev.morphia.annotations.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@ToString
@NoArgsConstructor
@Entity("lab3")
public class PointEntity {

    @Id
    private String id;  // _id в MongoDB
    private double x;      // x
    private double y;      // y
    private double r;      // r
    private String status;  // status

    @Getter
    private List<PointEntity> results = new ArrayList<>();

    public PointEntity(double x, double y, double r, String status) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.status = status;
    }

}
