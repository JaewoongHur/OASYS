package com.dolfin.oasys.domian.history.model.entity;

import com.dolfin.oasys.domian.category.model.entity.Category;
import com.dolfin.oasys.domian.member.model.entity.Member;
import java.time.LocalDateTime;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "History")
@IdClass(HistoryId.class)
public class History {

    @Id
    private LocalDateTime usingAt;

    @Id
    @ManyToOne( fetch = FetchType.LAZY)
    @JoinColumn(name="history_user_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="history_cate_id")
    private Category category;
}
