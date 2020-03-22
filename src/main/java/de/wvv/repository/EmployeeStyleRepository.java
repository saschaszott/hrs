package de.wvv.repository;

import de.wvv.domain.EmployeeStyle;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the EmployeeStyle entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmployeeStyleRepository extends JpaRepository<EmployeeStyle, Long> {
}
