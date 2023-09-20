package com.dolfin.oasys.domain.category.repository;

import com.dolfin.oasys.domain.category.model.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CateRepository extends JpaRepository<Category, Long> {

}
