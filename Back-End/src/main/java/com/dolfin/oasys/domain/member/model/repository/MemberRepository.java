package com.dolfin.oasys.domain.member.model.repository;

import com.dolfin.oasys.domain.member.model.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member,Long> {
    Member findByFaceId(String faceId);
}
