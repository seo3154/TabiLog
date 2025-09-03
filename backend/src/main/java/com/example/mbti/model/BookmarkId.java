package com.example.mbti.model;

import java.io.Serializable;
import javax.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class BookmarkId implements Serializable {
    private Long userId;
    private Long travelId;
}
