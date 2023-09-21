package com.dolfin.oasys.repository;

import com.dolfin.oasys.model.entity.TellerType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TellerTypeRepository extends JpaRepository<TellerType, Long> {
    List<TellerType> findAll();
}
