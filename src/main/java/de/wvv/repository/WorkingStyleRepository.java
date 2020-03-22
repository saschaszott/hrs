package de.wvv.repository;

import de.wvv.domain.WorkingStyle;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the WorkingStyle entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WorkingStyleRepository extends JpaRepository<WorkingStyle, Long> {
}
